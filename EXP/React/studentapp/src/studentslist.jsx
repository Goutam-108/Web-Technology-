const StudentsList = () => {
    const students = [
        { id: 1, name: 'Om', age: 20 , email: 'om@2005mail.com' },
        { id: 2, name: 'Shivtej', age: 22, email: 'shivtej@2005mail.com' },
        { id: 3, name: 'tejas', age: 21, email: 'tejas@2005mail.com' },
    ];
    return (
        <div>
            <h2>Students List</h2>
            <ul>
                {students.map(student => (
                    <h3 key={student.id}>
                        <strong>{student.name}</strong> - Age: {student.age}
                        <br />
                        Email: {student.email}  
                        <hr />
                    </h3>
                ))}
            </ul>
        </div>
    );
}

export default StudentsList;