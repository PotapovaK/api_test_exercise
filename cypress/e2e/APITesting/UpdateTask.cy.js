///<reference types='cypress'/>
describe('Update task', () => {
    let taskId;
    /*const randomNumber = Math.random().toString().slice(2);
    let userId = randomNumber;*/
    const requestBody = {
        'content': 'string',
        'user_id': 'string', ///userId,
        'task_id': 'string',
        'is_done': false  
    }

    const updatedBody = {
        'content': 'stringUpdated',
        'user_id': 'string', ///userId,
        'task_id': 'taskId',
        'is_done': false
    }

    before(() => {
        cy.request({
            method:'PUT',
            url: 'https://todo.pixegami.io/create-task', 
            body: requestBody
        }).as('createdTask')
    });
    
    it('Update task', () => {
        cy.get('@createdTask').then((createdTask) => {
           taskId = createdTask.body.task_id;
           createdTask = createdTask.body;
        
           cy.request({
               method:'PUT',
               url: 'https://todo.pixegami.io/update-task', 
               body: updatedBody
           }).as('updatedTask');
        })
        .its('status')
        .should('equal', 200)

        cy.get('@updatedTask').then((updatedTask) => {
            expect(taskId).to.equal(updatedTask.body.task_id);
        })
    });

    it('Response Content-Type checking', () => {
        cy.request('PUT', 'https://todo.pixegami.io/update-task', updatedBody)
        .then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
        })
    });
})