CREATE TABLE IF NOT EXISTS "area" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "route" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes_to_areas" (
	"route_id" integer NOT NULL,
	"area_id" integer NOT NULL,
	CONSTRAINT "routes_to_areas_route_id_area_id_pk" PRIMARY KEY("route_id","area_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routes_to_areas" ADD CONSTRAINT "routes_to_areas_route_id_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."route"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routes_to_areas" ADD CONSTRAINT "routes_to_areas_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
