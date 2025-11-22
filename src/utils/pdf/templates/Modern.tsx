import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../../../types';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
    },
    sidebar: {
        width: '30%',
        backgroundColor: '#2d3748',
        color: 'white',
        padding: 20,
        height: '100%',
    },
    main: {
        width: '70%',
        padding: 30,
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottom: '1px solid #4a5568',
        paddingBottom: 5,
        textTransform: 'uppercase',
    },
    sidebarText: {
        fontSize: 10,
        marginBottom: 5,
        lineHeight: 1.4,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 5,
    },
    role: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 10,
        textTransform: 'uppercase',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: 5,
    },
    experienceItem: {
        marginBottom: 15,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    company: {
        fontSize: 11,
        color: '#4a5568',
        fontStyle: 'italic',
        marginBottom: 2,
    },
    date: {
        fontSize: 10,
        color: '#718096',
        marginBottom: 4,
    },
    description: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#4a5568',
        textAlign: 'justify',
    },
});

interface TemplateProps {
    data: ResumeData;
}

export const ModernTemplate = ({ data }: TemplateProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.sidebar}>
                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Contato</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.email}</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.phone}</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.cityState}</Text>
                    <Text style={styles.sidebarText}>{data.personalInfo.address}</Text>
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Habilidades</Text>
                    {data.skills.map((skill, i) => (
                        <Text key={i} style={styles.sidebarText}>• {skill.name}</Text>
                    ))}
                </View>

                {data.courses.length > 0 && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Cursos</Text>
                        {data.courses.map((course, i) => (
                            <Text key={i} style={styles.sidebarText}>
                                {course.name}
                            </Text>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.main}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                    {/* Assuming the first experience role is the current title, or generic */}
                    <Text style={styles.role}>{data.experiences[0]?.role || 'Profissional'}</Text>
                </View>

                {data.personalInfo.summary && (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.sectionTitle}>Perfil</Text>
                        <Text style={styles.description}>{data.personalInfo.summary}</Text>
                    </View>
                )}

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>Experiência</Text>
                    {data.experiences.map((exp, i) => (
                        <View key={i} style={styles.experienceItem}>
                            <Text style={styles.jobTitle}>{exp.role}</Text>
                            <Text style={styles.company}>{exp.company}</Text>
                            <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Formação</Text>
                    {data.education.map((edu, i) => (
                        <View key={i} style={styles.experienceItem}>
                            <Text style={styles.jobTitle}>{edu.course}</Text>
                            <Text style={styles.company}>{edu.institution}</Text>
                            <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);
