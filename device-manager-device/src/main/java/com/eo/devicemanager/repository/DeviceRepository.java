package com.eo.devicemanager.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.eo.devicemanager.model.Device;


@Repository
public class DeviceRepository
{
	public List<Device> findAll()
	{
		return jdbcTemplate.query("SELECT * FROM Device", new RowMapper<Device>()
		{
			@Override
			public Device mapRow(ResultSet rs, int rowNum)
					throws SQLException
			{
				Device device = new Device();
				device.setId(rs.getLong("id"));
				device.setName(rs.getString("name"));
				device.setHardwareVersion(rs.getString("hardware_version"));
				return device;
			}
		});
	}

	public Device findById(Long id) throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM Device WHERE id = ?";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<Device>()
		{
			@Override
			public Device doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setLong(1, id);
				ResultSet rs = ps.executeQuery();
				Device device = new Device();

				if (rs.next())
				{
					device.setId(rs.getLong("id"));
					device.setName(rs.getString("name"));
					device.setHardwareVersion(rs.getString("hardware_version"));
				}

				return device;
			}
		});
	}

	public List<Device> findByName(String name) throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM Device WHERE name = ?";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<List<Device>>()
		{
			@Override
			public List<Device> doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setString(1, name);
				ResultSet rs = ps.executeQuery();
				List<Device> deviceList = new ArrayList<>();
				Device device = null;
	
				while (rs.next())
				{
					device = new Device();
					device.setId(rs.getLong("id"));
					device.setName(rs.getString("name"));
					device.setHardwareVersion(rs.getString("hardware_version"));
					deviceList.add(device);
				}
	
				return deviceList;
			}
		});
	}

	public Device save(Device device) throws DataAccessException, SQLException
	{
		String sql = "INSERT INTO Device(name, hardware_version) VALUES (?, ?)";
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator()
		{
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException
			{
				PreparedStatement ps = con.prepareStatement(sql,
						Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, device.getName());
				ps.setString(2, device.getHardwareVersion());
				return ps;
			}
		}, keyHolder);

		return findById((Long) keyHolder.getKey());
	}

	public Device update(Long id, Device device)
			throws DataAccessException, SQLException
	{
		Device oldDevice = findById(id);

		if (oldDevice.getId() != null)
		{
			if (device.getName() == null || device.getName().trim().equals(""))
				device.setName(oldDevice.getName());

			if (device.getHardwareVersion() == null || device.getHardwareVersion().trim().equals(""))
				device.setHardwareVersion(oldDevice.getHardwareVersion());

			device.setId(oldDevice.getId());
			String sql = "UPDATE Device SET name = ?, hardware_version = ? WHERE id = ?"; 
			int rows = jdbcTemplate.update(sql, preparedStatement ->
			{
				preparedStatement.setString(1, device.getName());
				preparedStatement.setString(2, device.getHardwareVersion());
				preparedStatement.setLong(3, id);
			});

			if (rows > 0)
				return device;
		}

		return new Device();
	}

	public Device delete(Long id) throws DataAccessException, SQLException
	{
		Device device = findById(id);
		String sql = "DELETE FROM Device WHERE id = ?";
		jdbcTemplate.update(sql, preparedStatement ->
		{
			preparedStatement.setLong(1, id);
		});

		return device;
	}

	public DeviceRepository(DataSource dataSource)
	{
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	

	private JdbcTemplate jdbcTemplate;
}
