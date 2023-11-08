/// <reference types="cypress" />
/// <reference path="./commands.d.ts" />
// ***********************************************

Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task('parseXlsx', {filePath: inputFile})
 })

 Cypress.Commands.add("saveXlsx", (workBook, filePath) => {
    cy.task('saveXlsx', {workBook: workBook, filePath: filePath})
 })

 
 Cypress.Commands.add("getFilesList", (directoryPath) => {
    cy.task('getFilesList', {directoryPath})
 })

 Cypress.Commands.add("connectFTP", (directoryPath) => {
    cy.task('connectFTP', {directoryPath})
 })

 
