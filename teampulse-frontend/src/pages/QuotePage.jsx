import './QuotePage.css'

const mood = {
		"id": 3,
		"value": 1,
		"description": "I feel stressed",
		"image_url": "//unsplash/it/100/100"
};

const workflow = {
		"id": 3,
		"value": 4,
		"description": "I have too much work",
		"image_url": "//unsplash/it/100/100"
}

const moodQuotes = {
    'high': 'Your inner world feels bright today - ',
    'medium':'You’re emotionally steady and open today - ',
    'low': 'Thank you for checking in — it takes strength to acknowledge hard moments - ',
};
const workflowQuotes = {
    'high': 'breathe it in and carry this grounded momentum forward',
    'medium': 'It"s okay to sit with the in-between moments. Your effort still matters.',
    'low': 'Be kind to yourself, and remember you don’t have to hold everything alone'
}


function QuotePage() {
    let moodKey;
    let workflowKey;
    if( mood.value<5){
        moodKey = 'low';
    } 
    if(5<mood.value<10){
        moodKey = 'medium';
    } 
    if(mood.value==10){
        moodKey = 'high';
    } 
    if(workflow.value<5){
        workflowKey = 'low';
    } 
    if(5<workflow.value<10){
        workflowKey = 'medium';
    } 
    if(workflow.value==10 && mood.value==10){
        workflowKey = 'high';
    } 
    
    const message = moodQuotes[moodKey]+workflowQuotes[workflowKey];
    
    return(
        <div className="quoteContainer">
            <p>
                <span className='quote'>{message}</span> 
            </p>
        </div>
    ) 
}

export default QuotePage;