function isResumeComplete(resume) {
    if (!resume) return false;
  
    const hasContact = resume.contact?.countryCode && resume.contact?.number;
  
    const hasEducation =
      Array.isArray(resume.education) &&
      resume.education.length > 0 &&
      resume.education[0].degree &&
      resume.education[0].institution;
  
    const hasProjects =
      Array.isArray(resume.projects) &&
      resume.projects.length > 0 &&
      resume.projects[0].title &&
      resume.projects[0].repoLink &&
      resume.projects[0].liveDemo;
  
    const hasSkills = Array.isArray(resume.skills) && resume.skills.length > 0;
  
    return hasContact && hasEducation && hasProjects && hasSkills;
  }
  
  module.exports = { isResumeComplete };
  