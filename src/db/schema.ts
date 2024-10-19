import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, primaryKey, numeric } from 'drizzle-orm/pg-core';

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


export const route = pgTable("route", {
    id: serial('id').primaryKey(),
    name: text("name").notNull(),
    lat: numeric("lat").notNull(),
    lng: numeric("lng").notNull(),
  })
  
  export const routeRelations = relations(route, ({ many }) => ({
    routesToAreas: many(routesToAreas),
  }));
  
  
  export const area = pgTable("area", {
    id: serial('id').primaryKey(),
    name: text("name").notNull(),
    lat: numeric("lat").notNull(),
    lng: numeric("lng").notNull(),
})


export const areaRelations = relations(area, ({ many }) => ({
    routesToAreas: many(routesToAreas),
}));

export const routesToAreas = pgTable(
    'routes_to_areas',
    {
      routeId: integer('route_id')
        .notNull()
        .references(() => route.id, {onDelete:"cascade"}),
      areaId: integer('area_id')
        .notNull()
        .references(() => area.id, {onDelete:'cascade'}),
    },
    (t) => ({
      pk: primaryKey({ columns: [t.routeId, t.areaId] }),
    }),
  );


  export const passengerNotifTable = pgTable("passenger_notif_table", {
    id: serial('id').primaryKey(),
    route: integer('route').notNull(),
    area: integer('area').notNull(),
    timestamp: timestamp('timestamp').defaultNow(),
})

export const passengerNotifRelations = relations(passengerNotifTable, ({ one }) => ({
  routeRelation: one(route, {
      fields: [passengerNotifTable.route],
      references: [route.id],
  }),
  areaRelation: one(area, {
      fields: [passengerNotifTable.area],
      references: [area.id],
  }),
}));

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