# This dockerfile builds an image for Cypress.
#
# Before building this image, be sure to build the tests you want to run in the container. Run the following from packages/app:
#
# yarn cy:build-<test-type>

FROM cypress/included:10.3.1

# From here on we use the least-privileged `node` user to run the backend.
USER node

WORKDIR /app

# Install cypress dependencies
RUN yarn add typescript \
    && yarn add cypress-tags \
    && yarn add cypress-multi-reporters \
    && yarn add cypress-teamcity-reporter \
    && yarn add mocha \
    && yarn add mochawesome \
    && yarn add mochawesome-merge\
    && yarn add @cypress/skip-test\
    && yarn add ftp \
    && yarn add node-xlsx

# Copy cypress common test artifacts
COPY --chown=node:node cypress-artifacts.tar.gz ./

RUN tar xzf cypress-artifacts.tar.gz && rm cypress-artifacts.tar.gz

#ADD ./fixtures ./cypress/fixtures
#USER node

#CMD ["yarn", "app/cypress","run", "--spec", "cypress/tests/update-xlsc-cell.cy.ts", "--browser", "chrome"]
CMD ["yarn", "app/cypress","run", "--spec", "cypress/tests/test.cy.ts", "--browser", "chrome"]