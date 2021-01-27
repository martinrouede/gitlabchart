const SEG_HORAS = 3600;

const handleSetDataColumnChart = (issues) => {
    let data = [];
    data.push(['# Issue', 'Estimated', 'Spent']);
    for (let index = 0; index < issues.length; index++) {
        const element = issues[index];
        //let cardId = '#' + element.id;
        //cardId.link(element.web_url);

        let issue = [
            '#' + element.iid,
            element.time_stats.time_estimate / SEG_HORAS,
            element.time_stats.total_time_spent / SEG_HORAS
        ]
        data.push(issue);
    }

    return data;
}

const utility = {
    handleSetDataColumnChart
};

export default utility;