var db = require("../db/models/db");
const { stories } = require("../db/models/models");
async function public_force() {
  console.log("Public force executed");

  try {
    //User Management
    let users = [];
    for (let i = 0; i < 7; i++) {
      users[i] = await db.models.users.create({
        name: `Usert_${i}`,
        email: `Meh`,
      });
    }
    let contexts = [];
    for (let i = 0; i < 7; i++) {
      contexts[i] = await db.models.contexts.create({
        name: `Context_${i}`,
        desc: `Meh`,
      });
    }
    let stories = [];
    for (let i = 0; i < 3; i++) {
      stories[i] = await db.models.stories.create({
        name: `Story_${i}`,
        desc: `Description_${i}`,
        contextId: 2,
        userId: 1,
      });
    }
    for (let i = 0; i < 3; i++) {
      stories[i + 3] = await db.models.stories.create({
        name: `Story_${i + 3}`,
        desc: `Description_${i + 3}`,
        contextId: 3,
        userId: 1,
      });
    }
    let entries = [];
    for (let i = 0; i < 3; i++) {
      entries[i] = await db.models.entries.create({
        title: `Entry_${i}`,
        desc: `Description_${i}`,
        storyId: 2,
      });
    }
    for (let i = 0; i < 3; i++) {
      entries[i + 3] = await db.models.entries.create({
        title: `Entry_${i + 3}`,
        desc: `Description_${i + 3}`,
        storyId: 3,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  var schema = ["sequelize", true, public_force];

  console.log("Creating the tables");

  console.log(schema);
  public_ret = await db[schema[0]].sequelize.sync({ force: schema[1] });

  console.log(schema[0] + " created");
  if (schema[1]) {
    force_ret = await schema[2]();
    console.log(schema[0] + " force param executed " + force_ret);
  }
  console.log("\n\n\n\n\n");
  process.exit();
}

if (require.main == module) {
  main();
}
