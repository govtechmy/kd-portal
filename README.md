# kd-portal

Welcome to the repository for the website of the Digital Ministry of Malaysia (Kementerian Digital Malaysia).

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Payload CMS](https://github.com/payloadcms/payload)

## Design System

`kd-portal` is built with MyDS - the Malaysian Government Design System that aims to modernise, revamp and uplift the design language and usability of all Malaysian government sites.
- [kd-portal Figma](https://www.figma.com/design/qfLxnLhraputrVraVOKD6n)
- MyDS Figma (Stay tuned)

## Installation

We recommend using `pnpm` to manage the project's dependencies.

```sh
git clone git@github.com:govtechmy/kd-portal.git

# pnpm
pnpm i

cp .env.example .env
```

## Commands to Knows

```bash
# Start development servers
pnpm dev

# With docker compose
docker-compose up
```

## Development Workflow

1. Branch out from `staging` & give the new branch a descriptive name eg: `feat/new-feature`, `fix/dropdown-bug` etc.
2. After you're done developing, `git fetch && git merge origin/staging` to synchronize any new changes & resolve conflicts, if there is any.
3. Push the branch to remote and create a PR to `staging`. Briefly describe the changes introduced in the PR.
4. Assign a core developer to review and wait for it to be approved.
5. That's all. Happy developing!

## Contributing

Thank you for your willingness to contribute to this free and open source project by the Malaysian public sector! When contributing, consider first discussing your desired change with the core team via GitHub issues or discussions!

### Issues

Issues are very valuable to this project and we appreciate the time you take with the repository.

If you have anything specific and project-related to this repository, feel free to create an issue ticket.

- Ideas are a valuable source of contributions others can make
- Problems show where this project is lacking
- A question can help show how we might improve the user experience

Thank you for creating them.

## License

kd-portal is licensed under [MIT](./LICENSE.md)

Copyright © 2023 Government of Malaysia