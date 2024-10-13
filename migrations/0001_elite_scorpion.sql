ALTER TABLE "routes_to_areas" DROP CONSTRAINT "routes_to_areas_route_id_route_id_fk";
--> statement-breakpoint
ALTER TABLE "routes_to_areas" DROP CONSTRAINT "routes_to_areas_area_id_area_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routes_to_areas" ADD CONSTRAINT "routes_to_areas_route_id_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."route"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routes_to_areas" ADD CONSTRAINT "routes_to_areas_area_id_area_id_fk" FOREIGN KEY ("area_id") REFERENCES "public"."area"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
