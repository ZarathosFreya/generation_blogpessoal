/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact('Andressa Neves','https://github.com/ZarathosFreya','andressas@genstudents.com')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // mandando uma variavel de ambiente (Tz) dizendo q estamos em um horário -03:00
  process.env.TZ = '-03:00';

  // habilitando globalmente a validção de dados
  app.useGlobalPipes(new ValidationPipe());

  // habilitando CORS (Cross-Origin Resource Sharing) para permitir comunicação entre aplicações
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();