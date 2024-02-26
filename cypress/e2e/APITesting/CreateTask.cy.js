///<reference types='cypress'/>
describe('Create a task', () => {
    /*const randomNumber = Math.random().toString().slice(1);
    let userId = randomNumber;*/
    const requestBody = {
        'content': 'string',
        'user_id': 'string', ///userId,
        'task_id': 'string',
        'is_done': false  
    }
    
    it('Status code checking', () => {
        cy.request({
            method:'PUT',
            url: 'https://todo.pixegami.io/create-task', 
            body: requestBody
        })
        .its('status')
        .should('equal', 200);
    });

    it('Response Content-Type checking', () => {
        cy.request('PUT', 'https://todo.pixegami.io/create-task', requestBody)
        .then((response) => {
        expect(response.headers['content-type']).to.include('application/json');
        })
    });

    it('Response body elements checking', () => {
        cy.request('PUT', 'https://todo.pixegami.io/create-task', requestBody)
        .then((response) => {
        const task = response.body.task;

        expect(task).to.have.property('user_id');
        expect(task).to.have.property('content');
        expect(task).to.have.property('is_done').to.equal(false);
        expect(task).to.have.property('created_time');
        expect(task).to.have.property('task_id');
        expect(task).to.have.property('ttl');
        })
    });

    it('Checking response body value types', () => {
        cy.request('PUT', 'https://todo.pixegami.io/create-task', requestBody)
        .then((response) => {
        const task = response.body.task;

        expect(task.user_id).to.be.a('string');
        expect(task.content).to.be.a('string');
        expect(task.is_done).to.be.a('boolean');
        expect(task.created_time).to.be.a('number');
        expect(task.task_id).to.be.a('string');
        expect(task.ttl).to.be.a('number');
        })
    });
})