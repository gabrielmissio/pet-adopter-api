# pet-adopter-api

## Install dependencies

Use the package manager [npm](https://www.npmjs.com/) to install the projects dependencies.

```bash
npm i
```

## Run on localhost

*replace <STAGE> with the environment you want to run the application (dev, hml, prod)
*the default value is 'dev'

```bash
sls offline start --stage <STAGE>
```

## Deploy on AWS environment

*replace <STAGE> with the environment you want to run the application (dev, hml, prod)
*the default value is 'dev'

```bash
sls deploy --verbose --stage <STAGE>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
