# Testing electron with node java

To see the error do the following:
```
git clone https://github.com/yahyaKacem/testing-electron-with-node-java.git
cd testing-electron-with-node-java
yarn install // or npm i
// you can set the DEBUG env var here then:
electron-forge make // or yarn make
```
to remove the error, edit line 4 of `package.json` file like this:
with error:
```
"description": "a long description with line breaks\nto show the problem that happen during the build",
```
fixed:
```
"description": "a long description with line breaks to show the problem that happen during the build",
```

just remove the `\n` from the body of the description.
and rerun `electron-forge make` or `yarn make`.