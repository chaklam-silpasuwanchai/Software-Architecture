# Lab 9: CI/CD with GitHub Action

Welcome back to this amazing series of "Becoming DevOps: Zero to Hero". Now that you have learnt so many tools for developing efficiently, we change our gear and ask how would we ensure the quality of our code?

But... What is "quality of code" means?

Well, if we did some research on Google, we would end ups with many ideas.

1. Readability
2. Extensibility
3. Reusability
4. Portability
5. Maintainability
6. Testability
7. Reliability

and many many many more ...ability

Whoaaaaa!! That is so many and too many to consider. That is ok because there is no definitive of how to really measure those ...ability .... yet. Maybe, in the next year, one of you will develop Deep Learning Base Code Analyzer to objectively measure the quality.

The basic mind set of "good code" is "maintainability".

> [DevOps tech: Code maintainability - cloud.google.com](https://cloud.google.com/architecture/devops/devops-tech-code-maintainability#:~:text=Code%20maintainability%20is%20a%20capability,large%20codebases%20and%20large%20organizations.)
> 
> The 2019 State of DevOps Report from DevOps Research and Assessment (DORA) research shows that the ability of teams to maintain their code effectively is one of a number of technical practices that contribute positively to success with **[continuous delivery](https://cloud.google.com/architecture/devops/devops-tech-continuous-delivery)**.
> If your team is doing a good job with code maintainability, the following are true:
> - It's easy for the team to find examples in the codebase, reuse other people's code, and change code maintained by other teams if necessary.
> - It's easy for the team to add new dependencies to their project, and to migrate to a new version of a dependency.
> - The team's dependencies are stable and rarely break the code.
> 
> These findings highlight the importance of making it easy for developers to find, reuse, and change code across the whole organization's codebase, and also of implementing practices and tools to help with dependency management.
> Code maintainability is a capability that requires organization-wide coordination, since it relies on being able to search, reuse, and change other teams' code. Managing dependencies effectively is often a major source of pain when working with large codebases and large organizations. Tooling that can help avoid problems with dependencies or illuminate the consequences of code changes can improve design decisions and code quality for all engineers, which in turn enables them to work faster and create more stable, reliable software.

From what we read, the issue is clearly shown when the project consists of multiple teams/devs and huge code base. 

> It is essential to adopt and evolve processes and tooling that make it easy for teams to consume known-good versions of dependencies and upgrade them rapidly, including automated **[continuous integration (CI)](https://cloud.google.com/architecture/devops/devops-tech-continuous-integration)** and **[testing](https://cloud.google.com/architecture/devops/devops-tech-test-automation)** to discover if new versions of dependencies contain breaking changes), and to quickly and simply correlate the versions of dependencies in use with the systems that use them.

## Continuous Integration (CI)

> [Continuous Integration (original version) - https://martinfowler.com/](https://martinfowler.com/articles/originalContinuousIntegration.html)
>
> The fundamental benefit of continuous integration is that it removes sessions where people spend time hunting bugs where one person's work has stepped on someone else's work without either person realizing what happened. These bugs are hard to find because the problem isn't in one person's area, it is in the interaction between two pieces of work. This problem is exacerbated by time. Often integration bugs can be inserted weeks or months before they first manifest themselves. As a result they take a lot of finding.

A code that has a bug will not cause an issue until it is. If your code has `a = b/c`, it will be fine until `c is 0`. If `c` is a result of `function_A`, how would you know that it will never be `0`.

> [DevOps tech: Continuous integration - cloud.google.com](https://cloud.google.com/architecture/devops/devops-tech-continuous-integration)
>
> The key elements in successfully implementing continuous integration are:
> 
> - Each commit should trigger a build of the software.
> - Each commit should trigger a series of automated tests that provide feedback in a few minutes.

## Before we continue, what about CD

> [DevOps tech: Continuous delivery - cloud.google.com](https://cloud.google.com/architecture/devops/devops-tech-continuous-delivery)
>
> Continuous delivery is the ability to release changes of all kinds on demand quickly, safely, and sustainably.
>
> Continuous delivery is commonly conflated with continuous deployment, but they are separate practices. Continuous deployment is when teams try to deploy every code change to production as soon as possible. Continuous deployment works well for web services, but can't be applied to software such as firmware or mobile apps. Continuous delivery is applied to all kinds of software including firmware and mainframe systems, and in highly regulated environments. You can and should start with continuous delivery, even if you never intend to start using continuous deployment.
> 
> Continuous delivery and continuous deployment are mistakenly viewed as risky and not suited to regulated or safety critical domains. In fact, the goal of continuous delivery is to reduce software risk, and DORA research has shown consistently that high performers achieve higher levels of reliability and availability. The technical practices that drive continuous delivery—continuous testing, shifting left on security, and comprehensive testing and observability—are even more important in highly regulated and safety-critical domains. Continuous delivery has been successfully applied many times in highly regulated domains such as financial services and government.

We want to achive Continuous delivery (CD) and Continuous integration (CI) is one of the step we have to do. And, to achive CI, Continuous testing is what we have to do. Then, to make Continuous testing happen, we have to create Teat automation.

Teat automation -> Continuous testing -> Continuous integration (CI) -> Continuous delivery (CD) 