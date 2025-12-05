CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"image_url" varchar(500),
	"display_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "varieties" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"name" varchar(150) NOT NULL,
	"latin_name" varchar(200),
	"slug" varchar(150) NOT NULL,
	"description" text,
	"full_description" text,
	"harvest_time" varchar(100),
	"blossom_time" varchar(100),
	"origin" varchar(200),
	"fruit_color" varchar(300),
	"taste" text,
	"pollination" varchar(200),
	"is_active" boolean DEFAULT true,
	"display_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "features" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "features_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "variety_features" (
	"variety_id" integer NOT NULL,
	"feature_id" integer NOT NULL,
	CONSTRAINT "variety_features_variety_id_feature_id_pk" PRIMARY KEY("variety_id","feature_id")
);
--> statement-breakpoint
CREATE TABLE "rootstocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "rootstocks_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "sizes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"min_height" integer NOT NULL,
	"max_height" integer NOT NULL,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "category_prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stock_movements" (
	"id" serial PRIMARY KEY NOT NULL,
	"variety_stock_id" integer NOT NULL,
	"quantity_change" integer NOT NULL,
	"movement_type" varchar(50) NOT NULL,
	"notes" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "variety_stock" (
	"id" serial PRIMARY KEY NOT NULL,
	"variety_id" integer NOT NULL,
	"rootstock_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"stock_quantity" integer DEFAULT 0,
	"low_stock_threshold" integer DEFAULT 3,
	"is_available" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "magic_link_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "magic_link_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(200),
	"role" varchar(50) DEFAULT 'editor',
	"is_active" boolean DEFAULT true,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "varieties" ADD CONSTRAINT "varieties_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variety_features" ADD CONSTRAINT "variety_features_variety_id_varieties_id_fk" FOREIGN KEY ("variety_id") REFERENCES "public"."varieties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variety_features" ADD CONSTRAINT "variety_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_prices" ADD CONSTRAINT "category_prices_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_prices" ADD CONSTRAINT "category_prices_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_variety_stock_id_variety_stock_id_fk" FOREIGN KEY ("variety_stock_id") REFERENCES "public"."variety_stock"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variety_stock" ADD CONSTRAINT "variety_stock_variety_id_varieties_id_fk" FOREIGN KEY ("variety_id") REFERENCES "public"."varieties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variety_stock" ADD CONSTRAINT "variety_stock_rootstock_id_rootstocks_id_fk" FOREIGN KEY ("rootstock_id") REFERENCES "public"."rootstocks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variety_stock" ADD CONSTRAINT "variety_stock_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "category_slug_idx" ON "varieties" USING btree ("category_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "category_price_idx" ON "category_prices" USING btree ("category_id","size_id");--> statement-breakpoint
CREATE UNIQUE INDEX "variety_stock_idx" ON "variety_stock" USING btree ("variety_id","rootstock_id","size_id");