create database service_market;

CREATE TABLE "users" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"name" VARCHAR(15) NOT NULL,
	"last_name" VARCHAR(20) NOT NULL,
	"email" VARCHAR(35) NOT NULL UNIQUE,
	"age" INTEGER NOT NULL CHECK(age>18),
	"registration_date" TIMESTAMP NOT NULL,
	"state" VARCHAR(10) NOT NULL DEFAULT 'asset',
	"username" VARCHAR(20) NOT NULL UNIQUE,
	"password" VARCHAR(255) NOT NULL,
	"phone" VARCHAR(20) NOT NULL,
	"stars" DECIMAL,
	PRIMARY KEY("id")
);
CREATE INDEX "users_index_0"
ON "users" ("id");

CREATE TABLE "services" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"name" VARCHAR(60) NOT NULL,
	"description" TEXT NOT NULL,
	"user_id" INTEGER NOT NULL,
	"stars" DECIMAL,
	"category" VARCHAR(60),
	PRIMARY KEY("id")
);
CREATE INDEX "services_index_0"
ON "services" ("user_id");

CREATE TABLE "comments" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"comment" TEXT NOT NULL,
	"user_id" INTEGER NOT NULL,
	"answer_id" INTEGER,
	"service_id" INTEGER NOT NULL,
	PRIMARY KEY("id")
);
CREATE INDEX "comments_index_0"
ON "comments" ("user_id", "id", "answer_id");

CREATE TABLE "saved_services" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"user_id" INTEGER NOT NULL,
	"service_id" INTEGER,
	PRIMARY KEY("id")
);

CREATE TABLE "images" (
	"id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
	"sample_image" VARCHAR(255),
	"service_id" INTEGER,
	PRIMARY KEY("id")
);

ALTER TABLE "services"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "comments"
ADD FOREIGN KEY("answer_id") REFERENCES "comments"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "comments"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "comments"
ADD FOREIGN KEY("service_id") REFERENCES "services"("id")
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "saved_services"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "saved_services"
ADD FOREIGN KEY("service_id") REFERENCES "services"("id")
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "images"
ADD FOREIGN KEY("service_id") REFERENCES "services"("id")
ON UPDATE CASCADE ON DELETE CASCADE;