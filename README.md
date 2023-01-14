How run application in local machine

For succesfull install do all 12 steps only fisrt time
front end part location resources/frontend


1. git clone 
2. composer install
3. npm install
4. create database healthcare in your mysql or phpmyadmin
5. copy content of file in .env.example to .env don't forget chanhe db login and pass in file 
6. php artisan vendor:publish --provider="Venturecraft\Revisionable\RevisionableServiceProvider"
7. php artisan migrate  
8. php artisan passport:install 
9. php artisan passport:keys 
10. php artisan migrate:fresh --seed
11. php artisan serve (dont close this teminal it`should always run )
12. npm run watch open in new terminal


If you got error in steps call the Areg +37494806080



IF YOU REFRESH YOUR MIGRATION PLEASE REAPET THIS STEPS BELOW
1. php artisan migrate:refresh
2. php artisan passport:install --force
3. php artisan passport:keys  --force
4. php artisan db:seed
5. http://127.0.0.1:8000/api/test browser run ara mi agnam

users
admin@admin.com
admin

driver@admin.com   TIkO  
admin



operator@admin.com
admin