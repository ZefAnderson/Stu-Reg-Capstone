const userData = user?.map((user) => (
    <React.Fragment key={user.email}>
      <tr><td className="label">First Name:</td><td className="value">{user.firstname}</td></tr>
      {/* ... other rows */}
    </React.Fragment>
  ));
  