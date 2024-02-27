///<reference types='cypress'/>
describe('Get definite task', () => {
    let taskId, createdTask;

    before(() => {
    /*const randomNumber = Math.random().toString().slice(2);
    let userId = randomNumber;*/

    const requestBody = {
        'content': 'string',
        'user_id': 'string', ///userId,
        'task_id': 'string',
        'is_done': false  
    };

    cy.request({
        method:'PUT',
        url: 'https://todo.pixegami.io/create-task', 
        body: requestBody
    }).then((response) => {
            taskId = response.body.task.task_id;
            createdTask = response.body;
            /*console.log('taskId:', taskId);
            console.log('createdTask:', createdTask);*/
        });
    });

    it('Get task by task_id', () => {
        cy.request({
            method:'GET',
            url: `https://todo.pixegami.io/get-task/${taskId}`,
            headers: {
                'accept': 'application/json'
            }
        })
        .as('fetchedTask')
        .its('status').should('equal', 200);

        cy.get('@fetchedTask').then((fetchedTask) => {
            ///console.log('fetchedTask:', fetchedTask);
            expect(fetchedTask.body).to.deep.include(createdTask.task);
        })
    });
})
