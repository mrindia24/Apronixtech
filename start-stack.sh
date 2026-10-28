#!/usr/bin/env bash
# Restart everything after a sandbox recycle.
set -e
cd /home/user/tools
[ -d pgdata/PG_VERSION ] || node_modules/@embedded-postgres/linux-x64/native/bin/initdb \
  -D /home/user/tools/pgdata -U apronix --pwfile=<(echo apronix) -A md5 -E UTF8
chmod 700 pgdata
node_modules/@embedded-postgres/linux-x64/native/bin/pg_ctl -D /home/user/tools/pgdata \
  -l /home/user/tools/pg.log -o "-p 55432 -c listen_addresses=127.0.0.1" start || true
sleep 2
cd /home/user/apronix-tech
npx prisma migrate deploy
npm run db:seed
npx next build
npx next start -H 0.0.0.0 -p 3000
