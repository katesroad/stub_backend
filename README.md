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
