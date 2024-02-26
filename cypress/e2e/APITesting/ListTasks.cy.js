///<reference types='cypress'/>
describe('List tasks for user', () => {
    let taskIdArray = [];
    let createdTasks = [];
    let userId;
    ///let requestBody;

    /*const randomNumber = Math.random().toString().slice(2);
    let userId = randomNumber;*/
    before (() => {
        const requests = [];

        for(let i = 1; i <= 5; i++) {
            const requestBody = {
                'content': `string${i}`,
                'user_id': 'string', ///userId,
                'task_id': 'string',
                'is_done': false
            };

            const request = cy.request({
                method:'PUT',
                url: 'https://todo.pixegami.io/create-task', 
                body: requestBody
            }).then((response) => {
                expect(response.status).to.equal(200);

                ///let taskId = response.body.task.task_id;
                taskIdArray.push(response.body.task.task_id);
                console.log(taskIdArray)
                ///let createdTask = response.body;
                createdTasks.push(response.body);
                console.log(createdTasks)
                userId = (response.body.task.user_id)
                /*console.log('taskId:', taskId);
                console.log('createdTask:', createdTask);*/
            });

            requests.push(request);
        }

        return Promise.all(requests);
    });
    
    it('Getting tasks list for user', () => {
        cy.request({
            method:'GET',
            url: `https://todo.pixegami.io/list-tasks/${userId}`,
        })
        .its('status').should('equal', 200)
        .as('tasksList');

        cy.get('@tasksList').then((tasksList) => {
            ///console.log('tasksList:', tasksList);
            expect(tasksList.body).to.deep.include(createdTasks);
        })
    });
})