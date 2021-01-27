import axios from 'axios';
//+ '&page=' + page + '&per_page=' + rowsPerPage)

const fetchGroups = async (user) => {
    try {
        let response = await axios.get(user.url + 'api/v4/groups?access_token=' + user.token);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};

const fetchProjects = async (user, groupId) => {
    try {
        let response = await axios.get(user.url + 'api/v4/groups/' + groupId + '/projects?access_token=' + user.token);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};

const fetchMilestones = async (user, projectId) => {
    try {
        let response = await axios.get(user.url + 'api/v4/projects/' +
            projectId + '/milestones?access_token=' + user.token);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};

const fetchIssues = async (user, projectId, milestoneTitle) => {
    try {
        let response = await axios.get(user.url + 'api/v4/projects/' +
            projectId + '/issues?access_token=' + user.token +
            '&milestone=' + milestoneTitle);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};

const fetchLabels = async (user, projectId, page) => {
    try {
        let response = await axios.get(user.url + 'api/v4/projects/' +
            projectId + '/labels?access_token=' + user.token + '&page=' + page);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};

const fetchResources = async (user, projectId, issueId) => {
    try {
        let response = await axios.get(user.url + 'api/v4/projects/' +
            projectId + '/issues/' + issueId + '/resource_label_events?access_token=' + user.token);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};


const fetchMyUser = async (user) => {
    try {
        let response = await axios.get(user.url + 'api/v4/user/?access_token=' + user.token);
        return response.data;
    } catch (error) {
        if (error.response)
            throw new Error(error.response.data.message);
        else
            throw new Error(error);
    }
};

const service = {
    fetchGroups,
    fetchProjects,
    fetchMilestones,
    fetchIssues,
    fetchResources,
    fetchLabels,
    fetchMyUser
};

export default service;