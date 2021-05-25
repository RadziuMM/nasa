## Installation and runing
```bash
$ yarn
$ yarn start
```
## ENDPOINTS

### GET http://www.localhost:7000/apod
### GET http://www.localhost:7000/sols
### POST http://www.localhost:7000/photos 
##### { date: string; rover: string; camera: string }
##### date = YYYY-MM-DD
##### rover= curiosity|opportunity|spirit
##### camera(optional) = fhaz|rhaz|mast|chemcam|mahli|mardi|navcam|pancam|minites|all
#### Why can i choose only one camera or rover per request?
##### It's my solution to ux and long time to response.A better answer is to have the frontend load the results incrementally than to wait 10 seconds for a response from the backend(IMHO).
#### Why I didn't do the whole CRUD REST API?
##### I did.And I deleted it because I don't need those endpoints(u can check that in git commit "crud for apod/photos/sols DB's")

## Own DataBase or NASA API Key?

Just change .env file.
DB must be mysql and must have 2 tables (sols and apod)

### apod
```sql
CREATE TABLE `apod` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`copyright` VARCHAR(100),
	`date` VARCHAR(100),
	`explanation` VARCHAR(500),
	`hdurl` VARCHAR(100),
	`media_type` VARCHAR(100),
	`service_version` VARCHAR(100),
	`title` VARCHAR(100),
	`url` VARCHAR(100),
	PRIMARY KEY (`id`)
);
```
### sols
```sql
CREATE TABLE `apod` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`terrestrial_date` VARCHAR(100),
	`sol` VARCHAR(100),
	`ls` VARCHAR(100),
	`season` VARCHAR(100),
	`min_temp` VARCHAR(100),
	`max_temp` VARCHAR(100),
	`pressure` VARCHAR(100),
	`sunrise` VARCHAR(100),
	`sunset` VARCHAR(100),
	PRIMARY KEY (`id`)
);
```
## Why don't I store photos in db?

API provides photos after 25 on request.I would need to perform over 1000 requests with each DB update .That would literally be a DDOS.