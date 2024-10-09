import { relations } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mysql-core';
import { integer, pgTable, serial, text, time, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
  .notNull()
  .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
  .notNull()
  .$onUpdate(() => new Date()),
});

export const passengerNotifTable = pgTable("passenger_notif_table", {
    id: serial('id').primaryKey(),
    route: text('route').notNull(),
    area: text('area').notNull(),
    timestamp: timestamp('timestamp').defaultNow(),
})

export const route = pgTable("route", {
    id: serial('id').primaryKey(),
    name: text("name").notNull()
})

export const routeRelations = relations(route, ({ many }) => ({
    routesToAreas: many(routesToAreas),
}));


export const area = pgTable("area", {
    id: serial('id').primaryKey(),
    name: text("name").notNull()
})

export const areaRelations = relations(area, ({ many }) => ({
    routesToAreas: many(routesToAreas),
}));

export const routesToAreas = pgTable(
    'routes_to_areas',
    {
      routeId: integer('route_id')
        .notNull()
        .references(() => route.id),
      areaId: integer('area_id')
        .notNull()
        .references(() => area.id),
    },
    (t) => ({
      pk: primaryKey({ columns: [t.routeId, t.areaId] }),
    }),
  );

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertArea = typeof area.$inferInsert;
export type SelectArea = typeof area.$inferSelect;

export type InsertRoute = typeof route.$inferInsert;
export type SelectRoute = typeof route.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertPasengerNotif = typeof passengerNotifTable.$inferInsert;
export type SelectPasengerNotif = typeof passengerNotifTable.$inferSelect;