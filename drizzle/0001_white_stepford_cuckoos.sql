CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"usename" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "users_usename_unique" UNIQUE("usename")
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;