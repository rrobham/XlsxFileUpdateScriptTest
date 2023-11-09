
describe('update excel cell value', () => {

    it('read data from excel', () => {      
     
        cy.getFiles("/workengineautomationtesting/drprod/cy").then((files) => {
            cy.log(files.length)
            files.forEach(file => {
                cy.log(file.name)
            })
        });
    })

})