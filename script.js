document.getElementById('fetchButton').addEventListener('click', async () => {
  const taskNumber = document.getElementById('taskNumber').value.trim();
  if (!taskNumber) {
    alert('Please enter a task number');
    return;
  }
  try {
    const resp = await fetch('https://n8n.t-tech.team/webhook-test/validate-requirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueKey: taskNumber })
    });
    if (!resp.ok) {
      throw new Error('Server error');
    }
    const data = await resp.json();
    document.getElementById('originalText').textContent = data.original || '';
    document.getElementById('processedText').value = data.processed || '';
    document.getElementById('originalContainer').style.display = 'block';
    document.getElementById('processedContainer').style.display = 'block';
  } catch (err) {
    alert('Failed to fetch task: ' + err.message);
  }
});
