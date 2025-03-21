# Steps to run the project

1. Run `cd auth`
2. Run `npm install`
3. Create file (in auth:) .env
4. Copy + paste from slack into auth/.env
5. Create file in auth/config: config.json
6. Copy + paste from slack into auth/config/config.json
7. Run `npm install --save-dev sequelize-cli`
8. Run `npx sequelize-cli db:migrate`
9. Finally, run `npm start`

### Note: If you make any changes in models (creation, modification or deletion), it will not reflect until migrations are made & applied
- Example of a migration command which creates a table for users:
- `npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string`
- Your command will obviously be different so refer the <a href="https://sequelize.org/docs/v6/other-topics/migrations/">official docs</a>.
