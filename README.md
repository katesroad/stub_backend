# README

Project is built from Nest monorepo mode. For more information, please refer to [doc](https://docs.nestjs.com/cli/monorepo)

## Files/Folders

- Dockerfiles
  - Dockerfile.[app_name] the Dockerfile for a specified app
- infra/k8s <br>
  kubernetes setup file

## secret

- create authentication related secret

```sh
kubectl create secret generic auth --from-literal=token=token --from-literal=tokenExpiresIn=7d --from-literal=access=access --from-literal=accessExpiresIn=1h
```

## Project API design

[Doc for API and data schema](https://docs.google.com/spreadsheets/d/1niF4XKdOwSrRPjPyDoTlzvIUf6vf43C7wXqamApLIIE/edit#gid=1388564848)
