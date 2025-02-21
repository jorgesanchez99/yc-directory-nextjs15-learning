import { defineQuery } from "next-sanity";

export const startups_query = defineQuery(`
    *[_type=="startup" && defined(slug.current) && !defined($search) || lower(title) match lower($search) || lower(category) match lower($search) || lower(author -> name) match lower($search)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,name,image,bio
  },
  views,
  description,
  category,
  image,
}`);



export const startup_by_id_query = defineQuery(`
  *[_type=="startup" && _id == $id]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,name,username,email,image,bio
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const startup_views_by_id_query = defineQuery(`
  *[_type=="startup" && _id == $id][0]{
  _id,views,
}`);

export const author_by_github_id_query = defineQuery(`
  *[_type=="author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);
export const author_by_id_query = defineQuery(`
  *[_type=="author" && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);


export const startups_by_author_query = defineQuery(`
  *[_type=="startup" && author._ref==$id ] | order(_createdAt desc) {
_id,
title,
slug,
_createdAt,
author -> {
  _id,name,image,bio
},
views,
description,
category,
image,
}`);

export const playlist_by_slug_query = defineQuery(
  `*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);