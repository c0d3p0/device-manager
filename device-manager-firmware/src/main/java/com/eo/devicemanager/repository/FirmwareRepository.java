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

import com.eo.devicemanager.model.Firmware;


@Repository
public class FirmwareRepository
{
	public List<Firmware> findAll()
	{
		String sql = "SELECT * FROM Firmware";
		return jdbcTemplate.query(sql, new RowMapper<Firmware>()
		{
			@Override
			public Firmware mapRow(ResultSet rs, int rowNum) throws SQLException
			{
				Firmware firmware = new Firmware();
				firmware.setId(rs.getLong("id"));
				firmware.setName(rs.getString("name"));
				firmware.setData(rs.getString("data"));
				return firmware;
			}
		});
	}

	public Firmware findById(Long id) throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM Firmware WHERE id = ?";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<Firmware>()
		{
			@Override
			public Firmware doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setLong(1, id);
				ResultSet rs = ps.executeQuery();
				Firmware firmware = new Firmware();

				if (rs.next())
				{
					firmware.setId(rs.getLong("id"));
					firmware.setName(rs.getString("name"));
					firmware.setData(rs.getString("data"));
				}

				return firmware;
			}
		});
	}

	public List<Firmware> findByNameWith(String name)
			throws SQLException, DataAccessException
	{
		String sql = "SELECT * FROM Firmware WHERE lower(name) like lower(?)";
		return jdbcTemplate.execute(sql, new PreparedStatementCallback<List<Firmware>>()
		{
			@Override
			public List<Firmware> doInPreparedStatement(PreparedStatement ps)
					throws SQLException, DataAccessException
			{
				ps.setString(1, "%" + name + "%");
				ResultSet rs = ps.executeQuery();
				List<Firmware> firmwareList = new ArrayList<>();
				Firmware firmware = null;

				while (rs.next())
				{
					firmware = new Firmware();
					firmware.setId(rs.getLong("id"));
					firmware.setName(rs.getString("name"));
					firmware.setData(rs.getString("data"));
					firmwareList.add(firmware);
				}

				return firmwareList;
			}
		});
	}

	public Firmware save(Firmware firmware) throws DataAccessException, SQLException
	{
		final String sql = "INSERT INTO Firmware(name, data) VALUES (?, ?)";
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator()
		{
			public PreparedStatement createPreparedStatement(Connection con) throws SQLException
			{
				PreparedStatement ps = con.prepareStatement(sql,
						Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, firmware.getName());
				ps.setString(2, firmware.getData());
				return ps;
			}
		}, keyHolder);

		return findById((Long) keyHolder.getKey());
	}

	public Firmware update(Long id, Firmware firmware)
			throws DataAccessException, SQLException
	{
		Firmware oldFirmware = findById(id);

		if (oldFirmware.getId() != null)
		{
			if (firmware.getName() == null || firmware.getName().trim().equals(""))
				firmware.setName(oldFirmware.getName());

			if (firmware.getData() == null || firmware.getData().trim().equals(""))
				firmware.setData(oldFirmware.getData());

			firmware.setId(oldFirmware.getId());
			String sql = "UPDATE Firmware SET name = ?, data = ? WHERE id = ?";
			int rows = jdbcTemplate.update(sql, preparedStatement ->
			{
				preparedStatement.setString(1, firmware.getName());
				preparedStatement.setString(2, firmware.getData());
				preparedStatement.setLong(3, id);
			});

			if (rows > 0)
				return firmware;
		}

		return new Firmware();
	}

	public Firmware delete(Long id) throws DataAccessException, SQLException
	{
		Firmware firmware = findById(id);
		String sql = "DELETE FROM Firmware WHERE id = ?";
		jdbcTemplate.update(sql, preparedStatement ->
		{
			preparedStatement.setLong(1, id);
		});

		return firmware;
	}

	public FirmwareRepository(DataSource dataSource)
	{
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	
	private JdbcTemplate jdbcTemplate;
}
