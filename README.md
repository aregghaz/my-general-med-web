How run application in local machine

front end part location resources/frontend


1. git clone 
2. composer install
3. npm install
4. create database healthcare in your mysq or phpmyadmin
5. copy content of file in .env.example to .env don't forget chanhe db login and pass in file 
6. php artisan vendor:publish --provider="Venturecraft\Revisionable\RevisionableServiceProvider"
7. php artisan migrate
8. php artisan passport:install 
9. php artisan passport:keys 
10. php artisan migrate:fresh --seed
11. php artisan serve (it`should always run )
12. npm run watch 


If you got error in steps call the Areg +37494806080
