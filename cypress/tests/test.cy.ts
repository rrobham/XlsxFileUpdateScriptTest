
describe('update excel cell value', () => {

    it('read data from excel', () => {      
        console.log(`${Cypress.env('ftpHost')} ${Cypress.env('ftpUser')} ${Cypress.env('ftpPassword')}`)
        cy.log(`${Cypress.env('ftpHost')} ${Cypress.env('ftpUser')} ${Cypress.env('ftpPassword')}`)
      
        cy.getFiles({host: Cypress.env('ftpHost'), user: Cypress.env('ftpUser'), password: Cypress.env('ftpPassword'), directoryPath: "/workengineautomationtesting/drprod/cy"}).then((files) => {
            cy.log(files)
            //files.forEach(file => {
            //   cy.log(file.name)
            //})
        });
    })

})