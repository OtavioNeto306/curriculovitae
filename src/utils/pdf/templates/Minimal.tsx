import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../../../types';

const styles = StyleSheet.create({
    page: {
        padding: 40, // Increased padding
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.6, // Increased line height
    },
    header: {
        marginBottom: 30, // Increased margin
        borderBottom: '1px solid #000',
        paddingBottom: 20, // Increased padding
        alignItems: 'center',
    },
    name: {
        fontSize: 28, // Slightly larger
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 12, // Increased margin
    },
    contact: {
        fontSize: 10,
        color: '#666',
        flexDirection: 'row',
        gap: 15, // Increased gap
    },
    section: {
        marginBottom: 25, // Increased margin between sections
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 12, // Increased margin
        borderBottom: '1px solid #eee',
        paddingBottom: 5, // Increased padding
    },
    experienceItem: {
        marginBottom: 15,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    role: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    company: {
        fontStyle: 'italic',
        marginBottom: 4,
    },
    date: {
        fontSize: 10,
        color: '#666',
    },
    description: {
        marginTop: 4,
        textAlign: 'justify',
    },
    skillItem: {
        marginRight: 10,
        backgroundColor: '#eee',
        padding: '4 8', // Increased padding
        borderRadius: 4,
        fontSize: 10,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8, // Increased gap
    },
});

interface TemplateProps {
    data: ResumeData;
}

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
