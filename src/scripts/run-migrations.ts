import "reflect-metadata";
import { AppDataSource } from "../config/database";

async function runMigrations() {
  try {
    console.log("Initializing data source...");
    await AppDataSource.initialize();
    console.log("Running pending migrations...");
    const migrations = await AppDataSource.runMigrations({ transaction: "each" });
    if (migrations.length === 0) {
      console.log("No pending migrations found.");
    } else {
      migrations.forEach((m) => console.log(`  Ran: ${m.name}`));
      console.log(`\nTotal migrations run: ${migrations.length}`);
    }
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

runMigrations();
