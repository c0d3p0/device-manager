package com.eo.devicemanager.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.eo.devicemanager.model.DeviceFirmware;


@Repository
public class DeviceFirmwareRepository
{
	public List<DeviceFirmware> findAll()
	{
		String sql = "SELECT * FROM DeviceFirmware";
		return jdbcTemplate.query(sql, new RowMapper<DeviceFirmware>()
		{
			@Override
			public DeviceFirmware mapRow(ResultSet rs, int rowNum)
					throws SQLException
			{
				DeviceFirmware deviceManager = new DeviceFirmware();
				deviceManager.setId(rs.getLong("id"));
				deviceManager.setDeviceId(rs.getLong("device_id"));
				deviceManager.setFirmwareId(rs.getLong("firmware_id"));
				deviceManager.setAssociationTime(rs.getDate("association_time"));
				return deviceManager;
			}
		});
	}

	public DeviceFirmware findById(Long id) throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM DeviceFirmware WHERE id = ?";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<DeviceFirmware>()
		{
			@Override
			public DeviceFirmware doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setLong(1, id);
				ResultSet rs = ps.executeQuery();
				DeviceFirmware deviceFirmware = new DeviceFirmware();

				if (rs.next())
				{
					deviceFirmware.setId(rs.getLong("id"));
					deviceFirmware.setDeviceId(rs.getLong("device_id"));
					deviceFirmware.setFirmwareId(rs.getLong("firmware_id"));
					deviceFirmware.setAssociationTime(rs.getDate("association_time"));
				}

				return deviceFirmware;
			}
		});
	}

	public List<DeviceFirmware> findByDeviceId(Long deviceId)
			throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM DeviceFirmware WHERE device_id = ? ORDER BY association_time DESC";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<List<DeviceFirmware>>()
		{
			@Override
			public List<DeviceFirmware> doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setLong(1, deviceId);
				ResultSet rs = ps.executeQuery();
				List<DeviceFirmware> deviceFirmwareList = new ArrayList<>();
				DeviceFirmware rf;

				while (rs.next())
				{
					rf = new DeviceFirmware();
					rf.setId(rs.getLong("id"));
					rf.setDeviceId(rs.getLong("device_id"));
					rf.setFirmwareId(rs.getLong("firmware_id"));
					rf.setAssociationTime(rs.getDate("association_time"));
					deviceFirmwareList.add(rf);
				}

				return deviceFirmwareList;
			}
		});
	}

	public DeviceFirmware findLatestByDeviceId(Long deviceId)
			throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM DeviceFirmware WHERE device_id = ? ORDER BY association_time DESC LIMIT 1"; 
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<DeviceFirmware>()
		{
			@Override
			public DeviceFirmware doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setLong(1, deviceId);
				ResultSet rs = ps.executeQuery();
				DeviceFirmware rf = new DeviceFirmware();

				if (rs.next())
				{
					rf.setId(rs.getLong("id"));
					rf.setDeviceId(rs.getLong("device_id"));
					rf.setFirmwareId(rs.getLong("firmware_id"));
					rf.setAssociationTime(rs.getDate("association_time"));
				}

				return rf;
			}
		});
	}

	public List<DeviceFirmware> findByFirmwareId(Long firmwareId)
			throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM DeviceFirmware WHERE firmware_id = ? ORDER BY association_time DESC";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<List<DeviceFirmware>>()
		{
			@Override
			public List<DeviceFirmware> doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setLong(1, firmwareId);
				ResultSet rs = ps.executeQuery();
				List<DeviceFirmware> deviceFirmwareList = new ArrayList<>();
				DeviceFirmware rf;

				while (rs.next())
				{
					rf = new DeviceFirmware();
					rf.setId(rs.getLong("id"));
					rf.setDeviceId(rs.getLong("device_id"));
					rf.setFirmwareId(rs.getLong("firmware_id"));
					rf.setAssociationTime(rs.getDate("association_time"));
					deviceFirmwareList.add(rf);
				}

				return deviceFirmwareList;
			}
		});
	}
	
	public void save(DeviceFirmware deviceFirmware) throws DataAccessException, SQLException
	{
		final String sql = "INSERT INTO DeviceFirmware(device_id, firmware_id) VALUES (?, ?)";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter()
		{
			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException
			{
				ps.setLong(1, deviceFirmware.getDeviceIds()[i]);
				ps.setLong(2, deviceFirmware.getFirmwareId());
			}

			@Override
			public int getBatchSize()
			{
				return deviceFirmware.getDeviceIds().length;
			}
		});
	}

	public DeviceFirmware delete(Long id) throws DataAccessException, SQLException
	{
		DeviceFirmware deviceFirmware = findById(id);
		String sql = "DELETE FROM DeviceFirmware WHERE id = ?";
		jdbcTemplate.update(sql, preparedStatement ->
		{
			preparedStatement.setLong(1, id);
		});

		return deviceFirmware;
	}

	public List<DeviceFirmware> deleteByDeviceId(Long deviceId)
			throws DataAccessException, SQLException
	{
		List<DeviceFirmware> deviceFirmwareList = findByDeviceId(deviceId);
		String sql = "DELETE FROM DeviceFirmware WHERE device_id = ?";
		jdbcTemplate.update(sql, preparedStatement ->
		{
			preparedStatement.setLong(1, deviceId);
		});

		return deviceFirmwareList;
	}

	public List<DeviceFirmware> deleteByFirmwareId(Long firmwareId)
			throws DataAccessException, SQLException
	{
		List<DeviceFirmware> deviceFirmwareList = findByFirmwareId(firmwareId);
		String sql = "DELETE FROM DeviceFirmware WHERE firmware_id = ?";
		jdbcTemplate.update(sql, preparedStatement ->
		{
			preparedStatement.setLong(1, firmwareId);
		});

		return deviceFirmwareList;
	}

	public DeviceFirmwareRepository(DataSource dataSource)
	{
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	
	private JdbcTemplate jdbcTemplate;
}
