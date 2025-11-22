export const MinimalTemplate = ({ data }: TemplateProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                <View style={styles.contact}>
                    <Text>{data.personalInfo.email}</Text>
                    {data.personalInfo.phone && <Text>• {data.personalInfo.phone}</Text>}
                    {data.personalInfo.cityState && <Text>• {data.personalInfo.cityState}</Text>}
                    {data.personalInfo.linkedin && <Text>• LinkedIn</Text>}
                </View>
            </View>

            {data.personalInfo.summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumo Profissional</Text>
                    <Text style={styles.description}>{data.personalInfo.summary}</Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                {data.experiences.map((exp, i) => (
                    <View key={i} style={styles.experienceItem}>
                        <View style={styles.jobHeader}>
                            <Text style={styles.role}>{exp.role}</Text>
                            <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                        </View>
                        <Text style={styles.company}>{exp.company}</Text>
                        <Text style={styles.description}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
                {data.education.map((edu, i) => (
                    <View key={i} style={styles.experienceItem}>
                        <View style={styles.jobHeader}>
                            <Text style={styles.role}>{edu.course}</Text>
                            <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text style={styles.company}>{edu.institution}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                <View style={styles.skillsContainer}>
                    {data.skills.map((skill, i) => (
                        <Text key={i} style={styles.skillItem}>{skill.name}</Text>
                    ))}
                </View>
            </View>

            {data.courses.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cursos e Certificações</Text>
                    {data.courses.map((course, i) => (
                        <View key={i} style={{ marginBottom: 4 }}>
                            <Text>• {course.name} - {course.institution} ({course.year})</Text>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    </Document>
);
