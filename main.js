document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
  // Input value function
  const getInputValue = id => document.getElementById(id).value;
  // End of input value function
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

// Count issues
const countIssues = () =>
{
  const totalIssues = document.getElementById("total");
  let issues = JSON.parse(localStorage.getItem('issues'));
  if(issues.length<10)
  {
    totalIssues.innerHTML = "0"+issues.length;
  }
  else
  {
    totalIssues.innerHTML = issues.length;
  }
}
// Count issues
const countCloseIssues = () =>
{
  let count = 0;
  const closedIssues = document.getElementById("closed");
  let issues = JSON.parse(localStorage.getItem('issues'));
  for(let i=0;i<issues.length;i++)
  {
    if(issues[i].status=="Closed")
    {
      count++;
    }
  }
  if(count<10)
  {
    closedIssues.innerHTML="0"+count;
  }
  else
  {
    closedIssues.innerHTML=count;
  }
}

// Close issues
const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = "Closed";
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// Delete issues
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue=> issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  countIssues();
  countCloseIssues();
}
