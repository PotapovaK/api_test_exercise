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

                taskIdArray.push(response.body.task.task_id);
                ///console.log(taskIdArray)
                createdTasks.push(response.body.task);
                ///console.log(createdTasks)
                userId = (response.body.task.user_id);
            });

            requests.push(request);
        }
    });
    
    it('Getting tasks list for user', () => {
        cy.request({
            method:'GET',
            url: `https://todo.pixegami.io/list-tasks/${userId}`,
        })
        .then((response) => {
            expect(response.status).to.equal(200);
            cy.wrap(response.body.tasks).as('tasksList');
        });

        cy.get('@tasksList').then((tasksList) => {
            console.log('tasksList:', tasksList);
            console.log('createdTasks:', createdTasks)
            createdTasks.forEach((createdTask) => {
                expect(tasksList.some(task => task.task_id === createdTask.task_id)).to.be.true;
            })
        })
    });
})
