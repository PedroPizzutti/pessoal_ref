module.exports = {
  dialect: 'sqlite',
  storage: '../database/bd_pessoal_ref.sqlite',

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
