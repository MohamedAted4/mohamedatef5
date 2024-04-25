from flask import Flask, render_template
import pyodbc

app = Flask(__name__)

# Connect to the SQL Server database
def connect_to_database():
    conn = pyodbc.connect('DRIVER={SQL Server};SERVER=JOKER;DATABASE=Cloud;UID=joker;PWD=217200')
    cursor = conn.cursor()
    return conn, cursor

# Route to display student information with enrolled courses
@app.route('/students')
def display_students_with_courses():
    conn, cursor = connect_to_database()
    cursor.execute("""
        SELECT 
            S.student_id,
            CONCAT(S.first_name, ' ', S.last_name) AS student_name,
            S.hours_assigned,
            S.c_gpa,
            D.department_name,
            D.department_code,
            MAX(CASE WHEN C.rn = 1 THEN C.course_name END) AS course_1,
            MAX(CASE WHEN C.rn = 2 THEN C.course_name END) AS course_2,
            MAX(CASE WHEN C.rn = 3 THEN C.course_name END) AS course_3,
            MAX(CASE WHEN C.rn = 4 THEN C.course_name END) AS course_4,
            MAX(CASE WHEN C.rn = 5 THEN C.course_name END) AS course_5
        FROM 
            dbo.students S
        JOIN 
            dbo.departments D ON S.department_code = D.department_code
        LEFT JOIN (
            SELECT 
                e.student_id,
                c.course_name,
                ROW_NUMBER() OVER (PARTITION BY e.student_id ORDER BY c.course_name) AS rn
            FROM 
                dbo.enrollment e
            JOIN 
                dbo.courses c ON e.course_code = c.course_code
        ) AS C ON S.student_id = C.student_id
        GROUP BY 
            S.student_id, S.first_name, S.last_name, S.hours_assigned, S.c_gpa, D.department_name, D.department_code
    """)
    students = cursor.fetchall()
    conn.close()
    return render_template('h.html', students=students)

if __name__ == '__main__':
    app.run(debug=True)
