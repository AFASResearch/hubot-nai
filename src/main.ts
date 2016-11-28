export = (robot: any) => {

  robot.hear(/temperature/i, (res: any) => {
    res.send('Not sure yet what the temperature is right now');
  })
}