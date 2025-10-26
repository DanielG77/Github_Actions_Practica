const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const email = core.getInput('email');
        const linterResult = core.getInput('linter_result');
        const cypressResult = core.getInput('cypress_result');
        const addBadgeResult = core.getInput('add_badge_result');
        const deployResult = core.getInput('deploy_result');

        // Simulamos el envío de email (en un caso real usarías un servicio de email)
        console.log('=== EMAIL NOTIFICATION ===');
        console.log(`To: ${email}`);
        console.log('Subject: Resultat del workflow executat');
        console.log('\nBody:');
        console.log('S\'ha realitzat un push en la branca main que ha provocat l\'execució del workflow nodejs-blog-workflow amb els següents resultats:');
        console.log(`- linter_job: ${linterResult}`);
        console.log(`- cypress_job: ${cypressResult}`);
        console.log(`- add_badge_job: ${addBadgeResult}`);
        console.log(`- deploy_job: ${deployResult}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();