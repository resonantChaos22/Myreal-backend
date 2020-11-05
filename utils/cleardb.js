var db = require("../db/models/db");

async function public_force() {
	console.log("Public force executed");
	await db.models.permissions.destroy({
		where: {},
	});
	await db.models.roles.destroy({
		where: {},
	});
	await db.models.ranks.destroy({
		where: {},
	});
	await db.models.document_types.destroy({
		where: {},
	});
	await db.models.documents.destroy({
		where: {},
	});
	await db.models.grievances.destroy({
		where: {},
	});
	await db.models.skills.destroy({
		where: {},
	});
	await db.models.training_metas.destroy({
		where: {},
	});
	await db.models.training_types.destroy({
		where: {},
	});
	await db.models.trainings.destroy({
		where: {},
    });
    await db.models.project_categories.destroy({
		where: {},
	});
	await db.models.project_metas.destroy({
		where: {},
	});
	await db.models.projects.destroy({
		where: {},
	});
	await db.models.sprints.destroy({
		where: {},
	});
	await db.models.comments.destroy({
		where: {},
	});
	await db.models.reviews.destroy({
		where: {},
	});
	await db.models.review_types.destroy({
		where: {},
	});
	await db.models.task_categories.destroy({
		where: {},
	});
	await db.models.task_metas.destroy({
		where: {},
    });
    await db.models.tasks.destroy({
		where: {},
	});
	await db.models.college_metas.destroy({
		where: {},
	});
	await db.models.colleges.destroy({
		where: {},
	});
	await db.models.departments.destroy({
		where: {},
	});
	await db.models.locations.destroy({
		where: {},
	});
	await db.models.user_details.destroy({
		where: {},
	});
	await db.models.user_qas.destroy({
		where: {},
    });
    await db.models.users.destroy({
		where: {},
	});
}

async function main() {
	var schema = ["sequelize", true, public_force];

	console.log("Clearing the tables");

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
