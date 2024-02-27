///<reference types='cypress'/>
describe('Delete definite task', () => {
    let taskId;

    before(() => {
    const requestBody = {
        'content': 'string',
        'user_id': 'string',
        'task_id': 'string',
        'is_done': false  
    };

    cy.request({
        method:'PUT',
        url: 'https://todo.pixegami.io/create-task', 
        body: requestBody
    }).then((response) => {
            taskId = response.body.task.task_id;
            ///console.log('taskId:', taskId);
        });
    });

    it('Delete task by task_id', () => {
        cy.request({
            method:'DELETE',
            url: `https://todo.pixegami.io/delete-task/${taskId}`,
            headers: {
                'accept': 'application/json'
            }
        })
        .as('deletedTask')
        .its('status').should('equal', 200);

        cy.get('@deletedTask').then((deletedTask) => {
            ///console.log('deletedTask:', deletedTask);
            expect(deletedTask.body.deleted_task_id).to.equal(taskId);
        })
    });
})