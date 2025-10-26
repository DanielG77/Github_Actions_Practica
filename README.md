# 🧩 Projecte Next.js amb Workflow CI/CD

Aquest projecte forma part d'una pràctica on s'aplica una sèrie de millores sobre un projecte base creat amb **Next.js**, integrant **GitHub Actions** per a la seua automatització, validació i desplegament.

---

## 📘 Introducció teòrica

### ⚙️ Què són les GitHub Actions?

**GitHub Actions** és una funcionalitat integrada a GitHub que permet **automatitzar fluxos de treball (workflows)** directament dins del repositori.  
Mitjançant fitxers YAML situats dins del directori `.github/workflows/`, podem definir **jobs** i **steps** que s’executen automàticament en resposta a esdeveniments com *push*, *pull request*, o *release*.

Els workflows permeten, per exemple:
- Validar codi amb **linter**.
- Executar **tests automàtics** (Cypress, Jest, etc.).
- **Desplegar** aplicacions a plataformes com **Vercel**, **Netlify**, o **GitHub Pages**.
- Enviar **notificacions o correus** amb els resultats.
- Generar **badges** o mètriques automàtiques.

Això permet implementar un **flux CI/CD (Continuous Integration / Continuous Deployment)**, assegurant que cada canvi al codi es verifica i desplega automàticament si passa totes les validacions.

---

## 🏗️ Estructura del Workflow (`nom_repositori_workflow.yml`)

El workflow conté cinc *jobs* principals:

### 1️⃣ Linter_job
- Executa l’script de linter del projecte (`npm run lint`).
- Verifica la qualitat i sintaxi del codi JavaScript.
- Si hi ha errors, els mostra i **atura el procés** fins que es corregeixen.

### 2️⃣ Cypress_job
- Executa els **tests de Cypress** utilitzant l’*action* oficial (`cypress-io/github-action`).
- Steps principals:
  - Checkout del codi.
  - Execució dels tests (continua encara que falle).
  - Creació d’un artefacte `result.txt` amb l’eixida del test.

### 3️⃣ Add_badge_job
- Recupera l’artefacte `result.txt`.
- Llig el resultat dels tests i genera un *output* amb:

- Executa una *action pròpia* que modifica el fitxer `README.md` afegint un *badge* al final del document segons el resultat:

| Resultat | Badge |
|-----------|-------|
| ✅ Success | ![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg) |
| ❌ Failure | ![Failure](https://img.shields.io/badge/test-failure-red) |

- Finalment, commiteja i puja el canvi al repositori.

### 4️⃣ Deploy_job
- Utilitza la *action* [`amondnet/vercel-action@v20`](https://github.com/amondnet/vercel-action) per a desplegar el projecte automàticament a **Vercel**.
- Steps:
- Checkout del codi.
- Desplegament automàtic amb les claus de Vercel definides com a *secrets* (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

### 5️⃣ Notification_job
- Sempre s’executa, independentment dels resultats dels jobs anteriors.
- Envia un **correu electrònic** amb el resultat global del workflow:
- Destinatari: la teua adreça (presa d’un secret `USER_EMAIL`).
- Assumpte: `Resultat del workflow nom_repositori_workflow`.
- Cos del missatge:
  ```
  S'ha realitzat un push en la branca main que ha provocat l'execució del workflow nom_repositori_workflow amb els següents resultats:

  - linter_job: resultat associat
  - cypress_job: resultat associat
  - add_badge_job: resultat associat
  - deploy_job: resultat associat
  ```

---

## 📦 Desplegament a Vercel

Aquest projecte es desplega automàticament a **Vercel** mitjançant la *action* [`amondnet/vercel-action@v20`](https://github.com/amondnet/vercel-action).

Perquè funcione correctament, s’han configurat els següents secrets en el repositori de GitHub:

| Secret | Descripció |
|---------|-------------|
| `VERCEL_TOKEN` | Token personal generat a Vercel |
| `VERCEL_ORG_ID` | ID de l’organització Vercel |
| `VERCEL_PROJECT_ID` | ID del projecte a Vercel |

🔗 **URL del desplegament:** [https://nomprojecte.vercel.app](https://nomprojecte.vercel.app)

---

## 📧 Notificacions automàtiques

El workflow envia un correu amb els resultats de cada execució gràcies al *Notification_job*.  
Aquesta funcionalitat utilitza una *action pròpia* escrita en JavaScript i el secret `USER_EMAIL`.

---

## 📊 Mètriques personals del perfil de GitHub

En el meu repositori principal (el que té com a nom el meu usuari de GitHub), he afegit una *GitHub Action* que mostra **mètriques dels llenguatges més utilitzats** als meus projectes, utilitzant el projecte [lowlighter/metrics](https://github.com/lowlighter/metrics).

Exemple de configuració:
```yaml
name: Metrics
on:
schedule: [{cron: "0 0 * * *"}]
workflow_dispatch:
jobs:
github-metrics:
  runs-on: ubuntu-latest
  steps:
    - uses: lowlighter/metrics@latest
      with:
        token: ${{ secrets.METRICS_TOKEN }}
        base: header, languages
        plugin_languages: yes
        plugin_languages_ignored: html, css
        plugin_languages_details: percentage
- Executa una *action pròpia* que modifica el fitxer `README.md` afegint un *badge* al final del document segons el resultat:

| Resultat | Badge |
|-----------|-------|
| ✅ Success | ![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg) |
| ❌ Failure | ![Failure](https://img.shields.io/badge/test-failure-red) |

- Finalment, commiteja i puja el canvi al repositori.

### 4️⃣ Deploy_job
- Utilitza la *action* [`amondnet/vercel-action@v20`](https://github.com/amondnet/vercel-action) per a desplegar el projecte automàticament a **Vercel**.
- Steps:
- Checkout del codi.
- Desplegament automàtic amb les claus de Vercel definides com a *secrets* (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

### 5️⃣ Notification_job
- Sempre s’executa, independentment dels resultats dels jobs anteriors.
- Envia un **correu electrònic** amb el resultat global del workflow:
- Destinatari: la teua adreça (presa d’un secret `USER_EMAIL`).
- Assumpte: `Resultat del workflow nom_repositori_workflow`.
- Cos del missatge:
  ```
  S'ha realitzat un push en la branca main que ha provocat l'execució del workflow nom_repositori_workflow amb els següents resultats:

  - linter_job: resultat associat
  - cypress_job: resultat associat
  - add_badge_job: resultat associat
  - deploy_job: resultat associat
  ```

---

## 📦 Desplegament a Vercel

Aquest projecte es desplega automàticament a **Vercel** mitjançant la *action* [`amondnet/vercel-action@v20`](https://github.com/amondnet/vercel-action).

Perquè funcione correctament, s’han configurat els següents secrets en el repositori de GitHub:

| Secret | Descripció |
|---------|-------------|
| `VERCEL_TOKEN` | Token personal generat a Vercel |
| `VERCEL_ORG_ID` | ID de l’organització Vercel |
| `VERCEL_PROJECT_ID` | ID del projecte a Vercel |

🔗 **URL del desplegament:** [https://nomprojecte.vercel.app](https://nomprojecte.vercel.app)

---

## 📧 Notificacions automàtiques

El workflow envia un correu amb els resultats de cada execució gràcies al *Notification_job*.  
Aquesta funcionalitat utilitza una *action pròpia* escrita en JavaScript i el secret `USER_EMAIL`.

---

## 📊 Mètriques personals del perfil de GitHub

En el meu repositori principal (el que té com a nom el meu usuari de GitHub), he afegit una *GitHub Action* que mostra **mètriques dels llenguatges més utilitzats** als meus projectes, utilitzant el projecte [lowlighter/metrics](https://github.com/lowlighter/metrics).

Exemple de configuració:
```yaml
name: Metrics
on:
schedule: [{cron: "0 0 * * *"}]
workflow_dispatch:
jobs:
github-metrics:
  runs-on: ubuntu-latest
  steps:
    - uses: lowlighter/metrics@latest
      with:
        token: ${{ secrets.METRICS_TOKEN }}
        base: header, languages
        plugin_languages: yes
        plugin_languages_ignored: html, css
        plugin_languages_details: percentage

- Executa una *action pròpia* que modifica el fitxer `README.md` afegint un *badge* al final del document segons el resultat:

| Resultat | Badge |
|-----------|-------|
| ✅ Success | ![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg) |
| ❌ Failure | ![Failure](https://img.shields.io/badge/test-failure-red) |

- Finalment, commiteja i puja el canvi al repositori.

### 4️⃣ Deploy_job
- Utilitza la *action* [`amondnet/vercel-action@v20`](https://github.com/amondnet/vercel-action) per a desplegar el projecte automàticament a **Vercel**.
- Steps:
- Checkout del codi.
- Desplegament automàtic amb les claus de Vercel definides com a *secrets* (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

### 5️⃣ Notification_job
- Sempre s’executa, independentment dels resultats dels jobs anteriors.
- Envia un **correu electrònic** amb el resultat global del workflow:
- Destinatari: la teua adreça (presa d’un secret `USER_EMAIL`).
- Assumpte: `Resultat del workflow nom_repositori_workflow`.
- Cos del missatge:
  ```
  S'ha realitzat un push en la branca main que ha provocat l'execució del workflow nom_repositori_workflow amb els següents resultats:

  - linter_job: resultat associat
  - cypress_job: resultat associat
  - add_badge_job: resultat associat
  - deploy_job: resultat associat
  ```

---

## 📦 Desplegament a Vercel

Aquest projecte es desplega automàticament a **Vercel** mitjançant la *action* [`amondnet/vercel-action@v20`](https://github.com/amondnet/vercel-action).

Perquè funcione correctament, s’han configurat els següents secrets en el repositori de GitHub:

| Secret | Descripció |
|---------|-------------|
| `VERCEL_TOKEN` | Token personal generat a Vercel |
| `VERCEL_ORG_ID` | ID de l’organització Vercel |
| `VERCEL_PROJECT_ID` | ID del projecte a Vercel |

🔗 **URL del desplegament:** [https://nomprojecte.vercel.app](https://nomprojecte.vercel.app)

---

## 📧 Notificacions automàtiques

El workflow envia un correu amb els resultats de cada execució gràcies al *Notification_job*.  
Aquesta funcionalitat utilitza una *action pròpia* escrita en JavaScript i el secret `USER_EMAIL`.

---

## 📊 Mètriques personals del perfil de GitHub

En el meu repositori principal (el que té com a nom el meu usuari de GitHub), he afegit una *GitHub Action* que mostra **mètriques dels llenguatges més utilitzats** als meus projectes, utilitzant el projecte [lowlighter/metrics](https://github.com/lowlighter/metrics).

Exemple de configuració:
```yaml
name: Metrics
on:
schedule: [{cron: "0 0 * * *"}]
workflow_dispatch:
jobs:
github-metrics:
  runs-on: ubuntu-latest
  steps:
    - uses: lowlighter/metrics@latest
      with:
        token: ${{ secrets.METRICS_TOKEN }}
        base: header, languages
        plugin_languages: yes
        plugin_languages_ignored: html, css
        plugin_languages_details: percentage

---

### 🧠 Com pots adaptar-lo
Abans de pujar-lo:
1. Substitueix:
   - `nomprojecte` → pel nom real del teu projecte Vercel.  
   - `nomusuari` → pel teu nom d’usuari GitHub.  
   - Enllaços o tokens si cal.  
2. Desa’l com `README.md` al repositori.  
3. El workflow `Add_badge_job` afegirà automàticament el badge sota la secció “RESULTAT DELS ÚLTIMS TESTS”.

---

Vols que et generi també l’exemple complet del workflow (`.github/workflows/nom_repositori_workflow.yml`) per acompanyar aquest README? Et puc fer el fitxer llest per copiar i enganxar.
