
describe('update excel cell value', () => {

    it('read data from excel', () => {      
     
        cy.getFiles({host: Cypress.env('ftpHost'), user: Cypress.env('ftpUser'), password: Cypress.env('ftpPassword'), directoryPath: "/workengineautomationtesting/drprod/cy"}).then((files) => {
            cy.log(files.length)
            files.forEach(file => {
                cy.log(file.name)
            })
        });
    })

})